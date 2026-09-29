import test from "node:test";
import assert from "node:assert/strict";
import { describeResource } from "../../lib/resources";
import { institutionType, matchesInstitution } from "../../lib/institutions";
test("resource actions describe destination without claiming authorship", () => {
  assert.equal(
    describeResource("https://github.com/NVIDIA-NeMo/NeMo").label,
    "View repository",
  );
  assert.equal(
    describeResource("https://huggingface.co/datasets/org/dataset").label,
    "View dataset",
  );
  assert.equal(
    describeResource("https://huggingface.co/spaces/org/demo").label,
    "Try demo",
  );
  assert.equal(
    describeResource("https://huggingface.co/org/model").label,
    "View model",
  );
  assert.equal(
    describeResource("https://researcher.github.io/demo/").label,
    "Open resource",
  );
});
test("TypeSafe classification and common institution aliases are available", () => {
  assert.equal(institutionType("NVIDIA"), "company");
  assert.equal(institutionType("National Taiwan University"), "university");
  assert.equal(institutionType("Academia Sinica"), "research");
  assert.equal(institutionType("Unrecognized organization"), "other");
  assert.ok(matchesInstitution("Carnegie Mellon University", "CMU"));
  assert.ok(matchesInstitution("Chinese University of Hong Kong", "CUKH"));
  assert.ok(matchesInstitution("Tencent", "Tecent"));
});
