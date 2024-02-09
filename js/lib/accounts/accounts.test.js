import { OnvoAccounts } from "./index";
describe("Accounts", () => {
    let onvoAccounts;
    beforeEach(() => {
        onvoAccounts = new OnvoAccounts("eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k", {
            endpoint: "https://staging.onvo.ai",
        });
    });
    it("should list accounts", async () => {
        const accounts = await onvoAccounts.list();
        expect(accounts).toBeDefined();
        expect(accounts.length).toBeGreaterThan(0);
        expect(accounts[0].id).toBeDefined();
        expect(accounts[0].full_name).toBeDefined();
        expect(accounts[0].avatar_url).toBeDefined();
        expect(accounts[0].updated_at).toBeDefined();
        expect(accounts[0].email).toBeDefined();
    });
    it("should get an account", async () => {
        const account = await onvoAccounts.get("1bda55a1-ae08-42e4-a27b-f1a122356789");
        expect(account.id).toBeDefined();
        expect(account.full_name).toBeDefined();
        expect(account.avatar_url).toBeDefined();
        expect(account.updated_at).toBeDefined();
        expect(account.email).toBeDefined();
    });
});
