import type { IncomingMessage, ServerResponse } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { Temporal } from "@js-temporal/polyfill";
import type IncomingForm from "formidable/Formidable";
import HTTPError from "~/utils/HTTPError";

/**
 * Upload using multiform data, requires using name file
 */

let nextUpdateUnixTime = 0;
let currentFolderName = "temp";
let form: IncomingForm;

// disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Upload(
  req: IncomingMessage & NextApiRequest,
  res: ServerResponse & NextApiResponse
) {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      reject(new HTTPError(405, `Method ${req.method as string} not allowed`));
      return;
    }
    if (Date.now() > nextUpdateUnixTime) {
      const now = Temporal.Now.plainDateISO();
      const firstDayOfWeek = now.subtract({ days: now.dayOfWeek - 1 });
      nextUpdateUnixTime = Date.now() + 3600000;
      currentFolderName = firstDayOfWeek.toString();
      if (!fs.existsSync("./uploads/" + currentFolderName)) {
        fs.mkdirSync("./uploads/" + currentFolderName);
      }
      form = new formidable.IncomingForm({
        multiples: true,
        uploadDir: "./uploads/" + currentFolderName,
        keepExtensions: true,
        maxFileSize: 1024, // 10Gb
        maxFieldsSize: 10 * 1024 * 1024 * 1024, // 10Gb
        maxFiles: 1024,
        filename: function (name, ext, _part, _form) {
          return name + ext;
        },
      });
    }

    form.parse(req, (err: Error, fields, files) => {
      if (err) {
        reject(new HTTPError(500, err?.message));
        return;
      }
      const { file } = files;
      if (file == undefined) {
        reject(new HTTPError(500, "Failed to upload file"));
        return;
      }

      console.log(files);
      console.log(fields);

      const fileArray = Array.isArray(file) ? file : [file];

      for (const file of fileArray) {
        console.log(file.filepath, file.newFilename);
      }

      // const { originalFilename, filepath: tempFilePath } = file;
      // const ext = (originalFilename ?? "unknown.unknown").split(".").pop();
      // const id = originalFilename;
      // const filePath = `./uploads/${id}.${ext}`;
      // fs.renameSync(tempFilePath, filePath);

      resolve(null);
    });
  })
    .then(() => {
      res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "Success: File uploaded successfully",
      });
    })
    .catch((err: HTTPError) => {
      res.status(500).json({
        status: "error",
        statusCode: err.statusCode,
        message: err.name + ": " + err.message,
      });
    });
}

// function setMetadata(file:formidable.File[]){

// }
