import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * Cursor Animation Usage Examples
 * 
 * This file demonstrates how the TargetCursor component works with different elements.
 * The cursor will automatically detect and animate around these interactive elements.
 */

const CursorExamples: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Cursor Animation Examples</h1>
      
      {/* Basic Button Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Button Examples</h2>
        <div className="flex gap-4 flex-wrap">
          <Button>Default Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button size="lg">Large Button</Button>
          <Button size="sm">Small Button</Button>
        </div>
      </section>

      {/* Link Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Link Examples</h2>
        <div className="flex gap-4 flex-wrap">
          <Link to="/" className="text-triada-silver hover:text-white transition-colors">
            Internal Link
          </Link>
          <a href="https://example.com" className="text-triada-silver hover:text-white transition-colors">
            External Link
          </a>
          <a href="mailto:info@triada-trade.com" className="text-triada-silver hover:text-white transition-colors">
            Email Link
          </a>
        </div>
      </section>

      {/* Custom Cursor Targets */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Custom Cursor Targets</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Logo with data attribute */}
          <div 
            data-logo="true" 
            className="w-16 h-16 bg-triada-silver rounded-lg flex items-center justify-center cursor-pointer hover:bg-triada-silver/80 transition-colors"
          >
            <span className="text-triada-black font-bold">TT</span>
          </div>
          
          {/* Custom cursor target class */}
          <div className="cursor-target w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center hover:border-triada-silver transition-colors">
            <span className="text-foreground">Target</span>
          </div>
          
          {/* Image with alt containing "logo" */}
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iI0IwQjBCMCIvPgo8dGV4dCB4PSIzMiIgeT0iMzgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5UVDwvdGV4dD4KPC9zdmc+" 
            alt="Company Logo" 
            className="w-16 h-16 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
          />
          
          {/* Role button */}
          <div 
            role="button" 
            tabIndex={0}
            className="w-16 h-16 bg-triada-silver rounded-lg flex items-center justify-center cursor-pointer hover:bg-triada-silver/80 transition-colors"
            onClick={() => alert('Clicked!')}
          >
            <span className="text-triada-black font-bold">Role</span>
          </div>
        </div>
      </section>

      {/* Interactive Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Interactive Cards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6 hover:border-triada-silver transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold text-foreground mb-2">Card 1</h3>
            <p className="text-muted-foreground">This card will trigger the cursor animation when hovered.</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 hover:border-triada-silver transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold text-foreground mb-2">Card 2</h3>
            <p className="text-muted-foreground">Notice how the cursor changes and corners appear.</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 hover:border-triada-silver transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold text-foreground mb-2">Card 3</h3>
            <p className="text-muted-foreground">The animation is smooth and responsive.</p>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-foreground mb-4">How It Works</h2>
        <div className="space-y-2 text-muted-foreground">
          <p>• <strong>Spinning Cursor:</strong> The cursor continuously rotates when not hovering over interactive elements</p>
          <p>• <strong>Corner Animation:</strong> When hovering over buttons, links, or other targets, animated corners frame the element</p>
          <p>• <strong>Smart Detection:</strong> Automatically detects buttons, links, logos, and elements with specific classes or attributes</p>
          <p>• <strong>Mix Blend Mode:</strong> Uses difference blend mode for high contrast against any background</p>
          <p>• <strong>Performance Optimized:</strong> Throttled mouse events and GPU acceleration for smooth animations</p>
        </div>
      </section>
    </div>
  );
};

export default CursorExamples;







