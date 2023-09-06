declare class Onvo {
    apiKey: string;
    constructor(apiKey: string);
    identifyUser(userId: string, userMetadata: any): void;
    createSession(obj: {
        dashboardId: string;
        userId: string;
        parameters: {
            [key: string]: any;
        };
    }): string;
}
export default Onvo;
