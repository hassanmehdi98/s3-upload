# S3-upload
This sample script will help you uploading any type of files from your directory to Amazon S3 or even DigitalOcean Spaces.

### Config

1- Copy `.env.example` to `.env`

2- Edit these configurations in `.env` file:

Key|Value (Example)
---|---
`S3_BUCKET_ENDPOINT`| Amazon S3: `my-bucket.s3.us-west-2.amazonaws.com`, DigitalOcean Spaces: `nyc1.digitaloceanspaces.com`
`S3_BUCKET_KEY`| `<your aws or digitalocean access key>`
`S3_BUCKET_SECRET`| `<your aws or digitalocean secret key>`
`S3_BUCKET_NAME`| any bucket name, example: `app-dev`

3- Simply add file in `files/` folder

4- Replace `fileName` variable to your file's name in `app.js` file.

5- Run `npm start`
