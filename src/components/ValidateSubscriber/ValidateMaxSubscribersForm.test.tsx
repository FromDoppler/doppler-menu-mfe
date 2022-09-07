import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { IntlProviderDouble } from "../i18n/DopplerIntlProvider.double-with-ids-as-values";
import { ValidateMaxSubscribersForm } from "./ValidateMaxSubscribersForm";
import { QuestionModel } from "./types";
import { AppConfigurationProvider } from "../../AppConfiguration";

const questionsMock: QuestionModel[] = [
  {
    answer: {
      answerType: "TEXTFIELD",
      answerOptions: [],
      value: "",
      optionsSelected: [],
    },
    question: "Name",
  },
  {
    answer: {
      answerType: "URL",
      answerOptions: [],
      value: "",
      optionsSelected: [],
    },
    question: "URL",
  },
  {
    answer: {
      answerType: "CHECKBOX_WITH_TEXTAREA",
      answerOptions: [
        "Website",
        "Event",
        "Landing Page",
        "CRM",
        "Personal Agenda",
        "Online/Offline Store",
        "Others",
      ],
      value: "",
      optionsSelected: [],
    },
    question:
      "Which of the following can be considered as your Subscribers’ source?",
  },
  {
    answer: {
      answerType: "CHECKBOX",
      answerOptions: ["Opt-in", "Doble Opt-in", "Manual"],
      value: "",
      optionsSelected: [],
    },
    question: "Which was the subscription method used to create your database?",
  },
];

describe("ValidateSubscribersFormComponent", () => {
  it("should not call handleSubmit when fields are empty", async () => {
    // Arrange
    const handleSubmit = jest.fn();

    // Act
    render(
      <IntlProviderDouble>
        <ValidateMaxSubscribersForm
          questions={questionsMock}
          onSubmit={handleSubmit}
        />
      </IntlProviderDouble>
    );

    // Assert
    const submitButton = await screen.getByRole("button", {
      name: "common.save",
    });
    await userEvent.click(submitButton);
    expect(handleSubmit).toBeCalledTimes(0);
  });

  it("should call handleSubmit when all fields are valid", async () => {
    // Arrange
    const name = "John Doe";
    const url = "http://www.someurl.com";
    const sourceSelected = "Online/Offline Store";
    const subscriptionMethod = "Opt-in";
    const handleSubmit = jest.fn();

    // Act
    render(
      <AppConfigurationProvider configuration={{ useDummies: true }}>
        <IntlProviderDouble>
          <ValidateMaxSubscribersForm
            questions={questionsMock}
            onSubmit={handleSubmit}
          />
        </IntlProviderDouble>
      </AppConfigurationProvider>
    );

    const inputName = await screen.getByRole("textbox", { name: /Name/i });
    await userEvent.clear(inputName);
    await userEvent.type(inputName, name);

    const inputUrl = await screen.getByRole("textbox", { name: /URL/i });
    await userEvent.clear(inputUrl);
    await userEvent.type(inputUrl, url);

    const checkboxSources = await screen.getByLabelText(sourceSelected);
    await userEvent.click(checkboxSources);

    const checkboxSubscriptionMethods = await screen.getByLabelText(
      subscriptionMethod
    );
    await userEvent.click(checkboxSubscriptionMethods);

    // Assert
    expect(inputName).toHaveValue(name);
    expect(inputUrl).toHaveValue(url);
    expect(checkboxSources).toBeChecked();
    expect(checkboxSubscriptionMethods).toBeChecked();

    const submitButton = await screen.getByRole("button", {
      name: "common.save",
    });
    await userEvent.click(submitButton);
    expect(handleSubmit).toBeCalledTimes(1);
  });

  it("should show textarea when last checkbox with textarea is checked ", async () => {
    // Arrange
    const sourceSelected = "Others";

    // Act
    render(
      <IntlProviderDouble>
        <ValidateMaxSubscribersForm
          questions={questionsMock}
          onSubmit={jest.fn()}
        />
      </IntlProviderDouble>
    );

    const checkboxSources = await screen.getByLabelText(sourceSelected);
    await userEvent.click(checkboxSources);
    const textarea = await screen.getByTestId("last-textarea");
    // Assert
    expect(textarea.classList.contains("dp-show")).toBeTruthy();
    expect(textarea.classList.contains("dp-hide")).toBeFalsy();
  });

  it("should hide textarea when last checkbox with textarea is not checked ", async () => {
    // Act
    render(
      <IntlProviderDouble>
        <ValidateMaxSubscribersForm
          questions={questionsMock}
          onSubmit={jest.fn()}
        />
      </IntlProviderDouble>
    );

    const textarea = await screen.getByTestId("last-textarea");
    // Assert
    expect(textarea.classList.contains("dp-hide")).toBeTruthy();
    expect(textarea.classList.contains("dp-show")).toBeFalsy();
  });
});
