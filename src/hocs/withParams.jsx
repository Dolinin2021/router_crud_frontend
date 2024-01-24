import { useParams } from 'react-router-dom';

export default function withParams(WrappedComponent) {
  function WithParams(props) {
    const params = useParams();
    return <WrappedComponent {...props} params={params} />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithParams.displayName = `withParams(${wrappedComponentName})`;
  return WithParams;
}
