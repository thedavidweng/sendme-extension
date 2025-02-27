import { useState } from "react";
import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";

export default function Command() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: { file: string[] }) => {
    try {
      setIsLoading(true);

      if (!values.file?.[0]) {
        throw new Error("No file selected");
      }

      await showToast({
        style: Toast.Style.Success,
        title: "File selected",
        message: `Selected ${values.file[0]}`,
      });
    } catch (error: any) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Error",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Share File" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.FilePicker
        id="file"
        title="Select File or Folder"
        canChooseDirectories
        info="Select a file or folder to share with sendme"
      />
    </Form>
  );
}
