declare module '@lectra/ld-react-feature-flags' {
  interface PropsFlag {
    children?: React.Element;
    flag: string;
    renderOn?: (flag: any) => any;
    fallbackRender?: (flag: any) => any;
  }

  interface PropsFlagProvider {
    children: React.Element;
    user: {
      key: string;
    };
    clientkey?: string;
    bootstrap?: object;
    onFlagsChange?: () => any;
    loadingComponent?: React.Element;
  }

  export const FlagsContext: React.Context;

  export const WithFlags = <P extends object>(key: string) => (
    ComponentA: any,
    ComponentB?: any
  ) => JSX.Element;

  export class Flags extends React.Component<PropsFlag> {
    public render(): React.Element;
  }

  // tslint:disable-next-line:max-classes-per-file
  export class FlagsProvider extends React.Component<
    PropsFlagProvider,
    { isFlagsLoaded: boolean }
  > {
    public LDReadyEvent(): Promise<any>;
    public async componentDidMount(): void;
    public render(): React.Element;
  }
  interface WithFlagsProps<T> {
    flags: T;
  }
}
