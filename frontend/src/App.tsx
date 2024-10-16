import { CopilotPopup } from "@copilotkit/react-ui";
import "./App.css";

import "@copilotkit/react-ui/styles.css";

function App() {

  function onSubmitMessage(message: string): Promise<void> {
    console.log('message', message)

    return Promise.resolve()
  }

  return (
    <div>
      <CopilotPopup
        labels={{
          title: "Your Assistant",
          initial: "Hi! 👋 How can I assist you today?",
        }}
        onSubmitMessage={onSubmitMessage}
      />
    </div>
  );
}

export default App;
