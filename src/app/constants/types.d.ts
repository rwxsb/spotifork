declare module "types" {
  interface authRequest {
    clientId: string;
    redirectUrl: string;
    scopes: string[];
  }
}
