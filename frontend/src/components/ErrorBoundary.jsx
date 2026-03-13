import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-black text-white mb-4">Something went wrong.</h1>
          <p className="text-slate-400 mb-8 max-w-md">The application encountered an unexpected error. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-cyan-500 text-slate-950 rounded-full font-bold"
          >
            Refresh Page
          </button>
          <div className="mt-8 w-full max-w-2xl">
            <p className="text-red-500 font-bold text-sm mb-2">Technical Details:</p>
            <pre className="p-4 bg-slate-900 border border-red-500/30 text-red-400 text-xs text-left overflow-auto max-w-full rounded-xl">
              {this.state.error?.toString()}
              {this.state.error?.stack}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
