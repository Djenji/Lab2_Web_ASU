import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";

// Можно добавить глобальные моки или настройки
configure({ testIdAttribute: "data-test" });
