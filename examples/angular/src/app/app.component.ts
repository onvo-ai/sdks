import { Component } from "@angular/core";
import "@onvo-ai/web-components";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div style="height:100vh; width:100vw; position: relative;">
      <onvo-copilot
        base-url="https://dashboard.onvo.ai"
        user-token="eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbIjZmYmQyMDYzLWIzYmYtNDUyMC04Y2Q1LWM4M2YzYmY3NmIxYiJdLCJwYXJlbnRfdGVhbSI6IjM1N2MyODFjLTQzNDctNDc3OC1hNTc1LTZhYWJlNGM4MzFiYyJ9LCJzdWIiOiIzMjEzYmViMy02NWEwLTRhNDUtYTliNC0wZjI0NmRhOTYwZWIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzIzMDE1MjYwfQ.CFKu9aNyfSXyY_vnqCqpz4I_JMhVwWf_7J_xV1M8lBU"
        icon-variant="small"
        dashboard-id="6fbd2063-b3bf-4520-8cd5-c83f3bf76b1b"
        copilot-variant="copilot"
      ></onvo-copilot>

      <div
        style="display: flex; flex-direction: row; height: 100vh; width: 100vw; position: relative;"
      >
        <div style="height: 100%; width: 640px; padding: 10px;">
          <onvo-dashboard-list
            num-columns="1"
            list-variant="grid"
            base-url="https://dashboard.onvo.ai"
            user-token="eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbIjZmYmQyMDYzLWIzYmYtNDUyMC04Y2Q1LWM4M2YzYmY3NmIxYiJdLCJwYXJlbnRfdGVhbSI6IjM1N2MyODFjLTQzNDctNDc3OC1hNTc1LTZhYWJlNGM4MzFiYyJ9LCJzdWIiOiIzMjEzYmViMy02NWEwLTRhNDUtYTliNC0wZjI0NmRhOTYwZWIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzIzMDE1MjYwfQ.CFKu9aNyfSXyY_vnqCqpz4I_JMhVwWf_7J_xV1M8lBU"
          ></onvo-dashboard-list>
        </div>
        <div style="position: relative; flex-grow: 1; width: 100%">
          <onvo-dashboard
            base-url="https://dashboard.onvo.ai"
            user-token="eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbIjZmYmQyMDYzLWIzYmYtNDUyMC04Y2Q1LWM4M2YzYmY3NmIxYiJdLCJwYXJlbnRfdGVhbSI6IjM1N2MyODFjLTQzNDctNDc3OC1hNTc1LTZhYWJlNGM4MzFiYyJ9LCJzdWIiOiIzMjEzYmViMy02NWEwLTRhNDUtYTliNC0wZjI0NmRhOTYwZWIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzIzMDE1MjYwfQ.CFKu9aNyfSXyY_vnqCqpz4I_JMhVwWf_7J_xV1M8lBU"
            dashboard-id="6fbd2063-b3bf-4520-8cd5-c83f3bf76b1b"
          ></onvo-dashboard>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "default";
}
