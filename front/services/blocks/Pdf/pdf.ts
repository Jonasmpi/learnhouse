import { getAPIUrl } from "@services/config/config";
import { RequestBody, RequestBodyForm } from "@services/utils/requests";

export async function uploadNewPDFFile(file: any, activity_id: string) {
  // Send file thumbnail as form data
  const formData = new FormData();
  formData.append("file_object", file);
  formData.append("activity_id", activity_id);

  return fetch(`${getAPIUrl()}blocks/pdf`, RequestBodyForm("POST", formData))
    .then((result) => result.json())
    .catch((error) => console.log("error", error));
}

export async function getPDFFile(file_id: string) {
  // todo : add course id to url
  return fetch(`${getAPIUrl()}blocks/pdf?file_id=${file_id}`, RequestBody("GET", null))
    .then((result) => result.json())
    .catch((error) => console.log("error", error));
}
