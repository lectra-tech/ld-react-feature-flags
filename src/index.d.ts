import React from 'react';
import { LDClient } from 'ldclient-js';

declare module '@lectra/ld-react-feature-flags' {
  interface PropsFlag {
    children?: React.ReactElement;
    flag: string;
    renderOn?: (flag: any) => any;
    fallbackRender?: (flag: any) => any;
  }

  interface PropsFlagProvider {
    children: React.ReactElement;
    user: {
      key: string;
    };
    clientkey?: string;
    bootstrap?: object;
    onFlagsChange?: () => any;
    loadingComponent?: React.ReactElement;
  }

  export const FlagsContext: React.Context<LDClient>;

  export const WithFlags: (
    key: string
  ) => (ComponentA: any, ComponentB?: any) => () => JSX.Element;

  export class Flags extends React.Component<PropsFlag> {
    public render(): React.ReactElement;
  }

  // tslint:disable-next-line:max-classes-per-file
  export class FlagsProvider extends React.Component<
    PropsFlagProvider,
    { isFlagsLoaded: boolean }
  > {
    public LDReadyEvent(): Promise<any>;
    public componentDidMount(): void;
    public render(): React.ReactElement;
  }
  interface WithFlagsProps<T> {
    flags: T;
  }
}
