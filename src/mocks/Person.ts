import { build, fake, sequence } from "@jackfranklin/test-data-bot";

import { Person } from "typings/Person";

export const personBuilder = build<Person>("Person", {
  fields: {
    id: sequence(String),
    firstNameLastName: fake((f) => f.name.findName()),
    jobTitle: fake((f) => f.name.jobTitle()),
    emailAddress: fake((f) => f.internet.email()),
  },
});
