export class API {
    private static readonly _Host: string = "http://localhost:49203";
    private static readonly _Api: string = "/api";
    private static readonly _BaseUrl: string = `${API._Host}${API._Api}`
    public static readonly Authenticate: string = `${API._BaseUrl}/authenticate`;
    public static readonly Courses: string = `${API._BaseUrl}/courses`;
  }
