import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * ErrorBoundary — catches render errors in the React tree and displays a
 * themed fallback so a single page crash doesn't destroy the whole app.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production you would send this to an error-tracking service.
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Caught error:', error, info.componentStack);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 mb-6">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white font-display mb-2">
            Module Failure Detected
          </h2>
          <p className="text-sm text-slate-400 font-mono mb-6 max-w-sm">
            A subsystem render error was intercepted. Other modules remain
            operational.
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/30 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reinitialise Module
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
