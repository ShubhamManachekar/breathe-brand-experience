import React from 'react';

type State = { hasError: boolean; error?: Error; info?: React.ErrorInfo };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] caught error', error, info);
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <pre className="whitespace-pre-wrap text-sm bg-destructive/10 p-4 rounded">{String(this.state.error?.message)}
{this.state.info?.componentStack}</pre>
          <p className="text-sm mt-4">Open the browser console to see more details.</p>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
