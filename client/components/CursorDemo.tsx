import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * Cursor Animation Demo Component
 * 
 * This demonstrates the advanced TargetCursor functionality with:
 * - Parallax corner animations
 * - Smart target detection
 * - Smooth spinning transitions
 * - Complex state management
 */

const CursorDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8 space-y-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          Advanced Cursor Animation Demo
        </h1>
        
        {/* Basic Interactive Elements */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Interactive Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button className="cursor-target">Hover Me</Button>
            <Link to="/" className="cursor-target inline-block bg-triada-silver text-triada-black px-6 py-3 rounded-lg hover:bg-triada-silver/80 transition-colors">
              Link Target
            </Link>
            <div 
              role="button" 
              tabIndex={0}
              className="cursor-target bg-card border border-border rounded-lg p-4 hover:border-triada-silver transition-colors cursor-pointer"
            >
              Role Button
            </div>
          </div>
        </section>

        {/* Logo Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Logo Detection</h2>
          <div className="flex gap-6 items-center">
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iI0IwQjBCMCIvPgo8dGV4dCB4PSIzMiIgeT0iMzgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5UVDwvdGV4dD4KPC9zdmc+" 
              alt="Company Logo" 
              className="w-16 h-16 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            />
            <div className="logo w-16 h-16 bg-triada-silver rounded-lg flex items-center justify-center">
              <span className="text-triada-black font-bold text-xl">TT</span>
            </div>
            <div data-logo="true" className="w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center hover:border-triada-silver transition-colors">
              <span className="text-foreground font-bold">Logo</span>
            </div>
          </div>
        </section>

        {/* Complex Interactive Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Complex Interactions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i}
                className="cursor-target bg-card border border-border rounded-lg p-6 hover:border-triada-silver transition-all duration-200 group"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-triada-silver transition-colors">
                  Interactive Card {i}
                </h3>
                <p className="text-muted-foreground mb-4">
                  This card demonstrates the advanced cursor animation with parallax corner effects and smooth transitions.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="cursor-target">Action</Button>
                  <Button size="sm" variant="outline" className="cursor-target">Secondary</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nested Interactive Elements */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Nested Elements</h2>
          <div className="cursor-target bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Parent Container</h3>
            <p className="text-muted-foreground mb-6">
              This container has the cursor-target class, and contains nested interactive elements.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button className="cursor-target">Nested Button 1</Button>
              <Button variant="outline" className="cursor-target">Nested Button 2</Button>
              <Link to="/" className="cursor-target text-triada-silver hover:text-white transition-colors">
                Nested Link
              </Link>
            </div>
          </div>
        </section>

        {/* Performance Test */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Performance Test</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 24 }, (_, i) => (
              <div 
                key={i}
                className="cursor-target w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center hover:border-triada-silver transition-colors"
              >
                <span className="text-foreground text-sm font-medium">{i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Advanced Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Parallax Corners:</strong> Corners move subtly based on mouse position within the target</li>
                <li>• <strong>Smart Detection:</strong> Automatically detects nested interactive elements</li>
                <li>• <strong>Smooth Transitions:</strong> Seamless spinning to corner animation transitions</li>
                <li>• <strong>Performance Optimized:</strong> Throttled animations and efficient cleanup</li>
                <li>• <strong>State Management:</strong> Complex state tracking for multiple targets</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Technical Details</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>GSAP Timeline:</strong> Advanced animation sequencing</li>
                <li>• <strong>Event Delegation:</strong> Efficient event handling</li>
                <li>• <strong>Memory Management:</strong> Proper cleanup and garbage collection</li>
                <li>• <strong>GPU Acceleration:</strong> Hardware-accelerated transforms</li>
                <li>• <strong>Mix Blend Mode:</strong> High contrast visibility</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CursorDemo;







