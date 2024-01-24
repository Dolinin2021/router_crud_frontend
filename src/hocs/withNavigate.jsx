import { useNavigate } from 'react-router-dom';

export default function withNavigate(WrappedComponent) {
  function WithNavigate(props) {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithNavigate.displayName = `withNavigate(${wrappedComponentName})`;
  return WithNavigate;
}
