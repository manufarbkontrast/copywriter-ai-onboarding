import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State;
  public props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-[#ff4500] p-4">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-light text-black mb-4">Etwas ist schiefgelaufen</h2>
            <p className="text-sm text-black mb-6">
              Es ist ein Fehler aufgetreten. Bitte lade die Seite neu oder kontaktiere den Support.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#ff4500] border border-black text-black text-sm font-light tracking-wide rounded-lg hover:bg-[#ff4500] transition-colors duration-200 uppercase"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

