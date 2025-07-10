import { Alert } from '@mui/material';
import { Component } from 'react';

class ErrorBoundary extends Component {
  // @ts-expect-error: Props type is not explicitly defined for ErrorBoundary constructor
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // @ts-expect-error: Error and errorInfo types are not explicitly defined
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    // @ts-expect-error: State type is not explicitly defined, so hasError may not be recognized
    if (this.state.hasError) {
      return (
        <Alert variant="filled" color="error">
          Something went wrong.
        </Alert>
      );
    }
    // @ts-expect-error: Props type is not explicitly defined, so children may not be recognized
    return this.props.children;
  }
}

export default ErrorBoundary;
