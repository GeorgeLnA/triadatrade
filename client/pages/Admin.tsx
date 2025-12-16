import { useState, useEffect } from "react";
import { useLoading } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface AnalyticsData {
  users: number | null;
  newUsers: number | null;
  sessions: number | null;
  pageViews: number | null;
  avgSessionDuration: number | null;
  avgEngagementTime: number | null;
  eventCount: number | null;
  activeUsersLast30Min: number | null;
  topPages: Array<{ 
    page: string; 
    pageTitle?: string;
    views: number; 
    users: number | null;
    eventCount: number | null;
  }>;
  topCountries: Array<{ country: string; users: number }>;
  topPlatforms: Array<{ platform: string; users: number }>;
  dateRange: {
    start: string;
    end: string;
  };
  errors?: Array<{ metric: string; error: string }>;
}

// Admin password - should be set via environment variable in production
// For now, using a default. In production, this should be fetched from the server
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "triada2025";

type DateRange = "today" | "lastWeek" | "lastMonth" | "lastYear" | "allTime" | "custom";

const getDateRange = (range: DateRange, customStart?: Date, customEnd?: Date): { start: string; end: string } => {
  const today = new Date();
  today.setHours(23, 59, 59, 999); // End of today
  
  const end = new Date(today);
  const start = new Date();
  
  if (range === "custom" && customStart && customEnd) {
    // Ensure custom dates are not in the future
    const safeStart = customStart > today ? today : customStart;
    const safeEnd = customEnd > today ? today : customEnd;
    
    // Ensure start is before end
    if (safeStart > safeEnd) {
      return {
        start: safeEnd.toISOString(),
        end: safeEnd.toISOString(),
      };
    }
    
    return {
      start: safeStart.toISOString(),
      end: safeEnd.toISOString(),
    };
  }
  
  switch (range) {
    case "today":
      start.setHours(0, 0, 0, 0);
      break;
    case "lastWeek":
      start.setDate(start.getDate() - 7);
      start.setHours(0, 0, 0, 0);
      break;
    case "lastMonth":
      start.setMonth(start.getMonth() - 1);
      start.setHours(0, 0, 0, 0);
      break;
    case "lastYear":
      start.setFullYear(start.getFullYear() - 1);
      start.setHours(0, 0, 0, 0);
      break;
    case "allTime":
      // GA4 started in October 2020, but we'll use January 2020 to be safe
      start.setFullYear(2020, 0, 1); // January 1, 2020
      start.setHours(0, 0, 0, 0);
      break;
    default:
      start.setMonth(start.getMonth() - 1);
      start.setHours(0, 0, 0, 0);
  }
  
  // Ensure end date is not in the future
  const safeEnd = end > today ? today : end;
  
  return {
    start: start.toISOString(),
    end: safeEnd.toISOString(),
  };
};

export default function Admin() {
  const { setHeroAnimationsComplete } = useLoading();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>("lastMonth");
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>(undefined);
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>(undefined);
  const [customRangeOpen, setCustomRangeOpen] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem("admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    
    // Disable animations and hide border lines/header on admin page
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('admin-no-anim');
      document.body.classList.add('admin-no-anim');
      const centerLogo = document.getElementById('border-logo');
      if (centerLogo) centerLogo.style.display = 'none';
      setHeroAnimationsComplete(true);
    }
    
    return () => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('admin-no-anim');
        document.body.classList.remove('admin-no-anim');
        const centerLogo = document.getElementById('border-logo');
        if (centerLogo) centerLogo.style.display = '';
        setHeroAnimationsComplete(false);
      }
    };
  }, [setHeroAnimationsComplete]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      toast({
        title: "Access Granted",
        description: "Welcome to the Admin Panel",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password",
        variant: "destructive",
      });
    }
    setIsLoading(false);
    setPassword("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    toast({
      title: "Logged Out",
      description: "You have been logged out",
    });
  };

  // Fetch analytics data
  const { data: analyticsData, isLoading: isLoadingAnalytics, refetch, error: analyticsError } = useQuery<AnalyticsData>({
    queryKey: ["analytics", dateRange, customStartDate, customEndDate],
    queryFn: async () => {
      const range = getDateRange(dateRange, customStartDate, customEndDate);
      const response = await fetch(`/api/analytics?start=${encodeURIComponent(range.start)}&end=${encodeURIComponent(range.end)}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: Failed to fetch analytics data`;
        throw new Error(errorMessage);
      }
      return response.json();
    },
    enabled: isAuthenticated && (dateRange !== "custom" || (customStartDate !== undefined && customEndDate !== undefined)),
    refetchInterval: 300000, // Refetch every 5 minutes
    retry: false, // Don't retry on error to prevent excessive requests
    retryOnMount: false, // Don't retry when component remounts
  });

  const handleDateRangeChange = (value: string) => {
    if (value === "custom") {
      setDateRange("custom");
      setCustomRangeOpen(true);
    } else {
      setDateRange(value as DateRange);
      setCustomStartDate(undefined);
      setCustomEndDate(undefined);
    }
  };

  const handleCustomRangeApply = () => {
    if (customStartDate && customEndDate) {
      setCustomRangeOpen(false);
      refetch();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-white text-black flex items-center justify-center">
        <div className="w-full max-w-md" style={{ 
          marginLeft: "clamp(1rem, 4vw, 70px)",
          marginRight: "clamp(1rem, 4vw, 70px)",
          maxWidth: "calc(100vw - clamp(2rem, 8vw, 140px))",
        }}>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="font-teko text-2xl uppercase">Admin Panel</CardTitle>
              <CardDescription className="font-metropolis">
                Enter password to access Google Analytics data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium font-metropolis">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="font-metropolis"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full font-teko uppercase"
                  disabled={isLoading}
                >
                  {isLoading ? "Authenticating..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-black">
      <main className="w-full" style={{ 
        marginLeft: "clamp(1rem, 4vw, 70px)",
        marginRight: "clamp(1rem, 4vw, 70px)",
        maxWidth: "calc(100vw - clamp(2rem, 8vw, 140px))",
        paddingTop: "clamp(4rem, 8vw, 6rem)",
        paddingBottom: "clamp(4rem, 8vw, 8rem)"
      }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <h1 className="font-teko text-4xl md:text-5xl lg:text-6xl uppercase">
              Admin Panel
            </h1>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => refetch()}
                className="font-teko uppercase border border-black text-black bg-white rounded-md px-4 py-2 h-10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-50"
                style={{ 
                  color: 'black', 
                  borderColor: 'black',
                  backgroundColor: 'white'
                }}
                disabled={isLoadingAnalytics}
              >
                {isLoadingAnalytics ? 'Refreshing...' : 'Refresh'}
              </button>
              <button 
                onClick={handleLogout}
                className="font-teko uppercase border border-black text-black bg-white rounded-md px-4 py-2 h-10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-50"
                style={{ 
                  color: 'black', 
                  borderColor: 'black',
                  backgroundColor: 'white'
                }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Analytics Data */}
          {isLoadingAnalytics ? (
            <div className="text-center py-12">
              <p className="font-metropolis text-gray-600">Loading analytics data...</p>
            </div>
          ) : analyticsError ? (
            <Card className="border-2 border-red-500">
              <CardContent className="py-12 px-6">
                <div className="text-center mb-4">
                  <p className="font-metropolis text-red-600 font-semibold mb-2">
                    Failed to fetch analytics data
                  </p>
                  <div className="font-metropolis text-gray-600 text-sm whitespace-pre-line text-left max-w-2xl mx-auto">
                    {analyticsError instanceof Error ? analyticsError.message : "Unknown error occurred"}
                  </div>
                </div>
                <p className="font-metropolis text-gray-500 text-xs mt-4 text-center">
                  Please check your Google Analytics configuration and try again.
                </p>
              </CardContent>
            </Card>
          ) : analyticsData ? (
            <div className="space-y-6">
              {/* Date Range Selector */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <label htmlFor="date-range" className="font-metropolis text-sm font-medium text-gray-700">
                    Date Range:
                  </label>
                  <Select value={dateRange} onValueChange={handleDateRangeChange}>
                    <SelectTrigger 
                      id="date-range" 
                      className="w-[180px] font-teko uppercase border-black text-black bg-white hover:bg-white hover:text-black"
                      style={{ 
                        color: 'black !important', 
                        borderColor: 'black !important',
                        backgroundColor: 'white !important'
                      }}
                    >
                      <SelectValue className="text-black" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="lastWeek">Last Week</SelectItem>
                      <SelectItem value="lastMonth">Last Month</SelectItem>
                      <SelectItem value="lastYear">Last Year</SelectItem>
                      <SelectItem value="allTime">All Time</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {dateRange === "custom" && (
                    <Popover open={customRangeOpen} onOpenChange={setCustomRangeOpen}>
                      <PopoverTrigger asChild>
                        <button
                          className="font-teko uppercase border border-black text-black bg-white rounded-md px-4 py-2 h-10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          style={{ 
                            color: 'black', 
                            borderColor: 'black',
                            backgroundColor: 'white'
                          }}
                        >
                          {customStartDate && customEndDate 
                            ? `${format(customStartDate, "MMM d")} - ${format(customEndDate, "MMM d")}`
                            : "Select Dates"}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-4 space-y-4">
                          <div className="space-y-2">
                            <label className="font-metropolis text-sm font-medium">Start Date</label>
                            <Calendar
                              mode="single"
                              selected={customStartDate}
                              onSelect={setCustomStartDate}
                              disabled={(date) => date > new Date() || (customEndDate ? date > customEndDate : false)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="font-metropolis text-sm font-medium">End Date</label>
                            <Calendar
                              mode="single"
                              selected={customEndDate}
                              onSelect={setCustomEndDate}
                              disabled={(date) => date > new Date() || (customStartDate ? date < customStartDate : false)}
                            />
                          </div>
                          <Button
                            onClick={handleCustomRangeApply}
                            disabled={!customStartDate || !customEndDate}
                            className="w-full font-teko uppercase border border-black text-black bg-white hover:bg-gray-100"
                            style={{ 
                              color: 'black', 
                              borderColor: 'black',
                              backgroundColor: 'white'
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                <p className="font-metropolis text-sm text-gray-600">
                  {analyticsData && (
                    <>
                      {new Date(analyticsData.dateRange.start).toLocaleDateString()} - {new Date(analyticsData.dateRange.end).toLocaleDateString()}
                    </>
                  )}
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-teko text-xl uppercase">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold font-metropolis">
                      {analyticsData.users !== null && analyticsData.users !== undefined
                        ? analyticsData.users.toLocaleString()
                        : 'N/A'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-teko text-xl uppercase">New Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold font-metropolis">
                      {analyticsData.newUsers !== undefined && analyticsData.newUsers !== null
                        ? analyticsData.newUsers.toLocaleString()
                        : 'N/A'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-teko text-xl uppercase">Active Users (Last 30 Min)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold font-metropolis">
                      {analyticsData.activeUsersLast30Min !== undefined && analyticsData.activeUsersLast30Min !== null
                        ? analyticsData.activeUsersLast30Min.toLocaleString()
                        : 'N/A'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-teko text-xl uppercase">Avg Engagement Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold font-metropolis">
                      {analyticsData.avgEngagementTime !== undefined && analyticsData.avgEngagementTime !== null && analyticsData.avgEngagementTime > 0
                        ? `${Math.floor(analyticsData.avgEngagementTime / 60)}m ${Math.floor(analyticsData.avgEngagementTime % 60)}s`
                        : 'N/A'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-teko text-xl uppercase">Event Count</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold font-metropolis">
                      {analyticsData.eventCount !== undefined && analyticsData.eventCount !== null
                        ? analyticsData.eventCount.toLocaleString()
                        : 'N/A'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-teko text-xl uppercase">Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold font-metropolis">
                      {analyticsData.sessions !== null && analyticsData.sessions !== undefined
                        ? analyticsData.sessions.toLocaleString()
                        : 'N/A'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-teko text-xl uppercase">Page Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold font-metropolis">
                      {analyticsData.pageViews !== null && analyticsData.pageViews !== undefined
                        ? analyticsData.pageViews.toLocaleString()
                        : 'N/A'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="font-teko text-xl uppercase">Avg. Session Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold font-metropolis">
                      {analyticsData.avgSessionDuration !== null && analyticsData.avgSessionDuration !== undefined
                        ? `${Math.floor(analyticsData.avgSessionDuration / 60)}m ${Math.floor(analyticsData.avgSessionDuration % 60)}s`
                        : 'N/A'}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Top Pages/Screens */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-teko text-2xl uppercase">Top Pages/Screens</CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsData.topPages && analyticsData.topPages.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-teko uppercase text-sm">Page Title</th>
                            <th className="text-right py-3 px-4 font-teko uppercase text-sm">Views</th>
                            <th className="text-right py-3 px-4 font-teko uppercase text-sm">Active Users</th>
                            <th className="text-right py-3 px-4 font-teko uppercase text-sm">Event Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analyticsData.topPages.map((page, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-3 px-4 font-metropolis">
                                <div>
                                  <div className="font-medium">{page.pageTitle || page.page}</div>
                                  <div className="text-sm text-gray-500">{page.page}</div>
                                </div>
                              </td>
                              <td className="text-right py-3 px-4 font-metropolis">{page.views.toLocaleString()}</td>
                              <td className="text-right py-3 px-4 font-metropolis">
                                {page.users !== undefined && page.users !== null ? page.users.toLocaleString() : 'N/A'}
                              </td>
                              <td className="text-right py-3 px-4 font-metropolis">
                                {page.eventCount !== undefined && page.eventCount !== null ? page.eventCount.toLocaleString() : 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="font-metropolis text-gray-500 text-center py-4">No page data available</p>
                  )}
                </CardContent>
              </Card>

              {/* Users by Platform */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-teko text-2xl uppercase">Users by Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsData.topPlatforms && analyticsData.topPlatforms.length > 0 ? (
                    <div className="space-y-3">
                      {analyticsData.topPlatforms.map((platform, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                          <span className="font-metropolis">{platform.platform}</span>
                          <span className="font-metropolis font-semibold">
                            {platform.users !== undefined && platform.users !== null
                              ? `${platform.users.toLocaleString()} users`
                              : 'N/A'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-metropolis text-gray-500 text-center py-4">No platform data available</p>
                  )}
                </CardContent>
              </Card>

              {/* Active Users by Country */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="font-teko text-2xl uppercase">Active Users by Country</CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsData.topCountries && analyticsData.topCountries.length > 0 ? (
                    <div className="space-y-3">
                      {analyticsData.topCountries.map((country, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                          <span className="font-metropolis">{country.country}</span>
                          <span className="font-metropolis font-semibold">
                            {country.users !== undefined && country.users !== null
                              ? `${country.users.toLocaleString()} users`
                              : 'N/A'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-metropolis text-gray-500 text-center py-4">
                      No country data available for the selected date range
                    </p>
                  )}
                </CardContent>
              </Card>

            </div>
          ) : (
            <Card className="border-2">
              <CardContent className="py-12 text-center">
                <p className="font-metropolis text-gray-600">
                  Unable to load analytics data. Please check your Google Analytics configuration.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

