import { faker } from "@faker-js/faker";
import { FC } from "react";

import { UiTime } from "../../../main/shared";
import { withGlobalStyles } from "../../__utils__";

const UiTimeFixture: FC = () => <UiTime time={faker.date.anytime()} />;

export default withGlobalStyles(UiTimeFixture);
