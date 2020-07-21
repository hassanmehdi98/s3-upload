# s3-upload
This sample script will help you uploading any type of files from your directory to Amazon S3 or even DigitalOcean Spaces.

### Config

1- Copy .env.example to .env

2- Add these configurations in .env file:
```
S3_BUCKET_ENDPOINT=<your s3 bucket endpoint>
```
Example:
    1- For Amazon S3: `my-bucket.s3.us-west-2.amazonaws.com`
    2- For DigitalOcean Spaces: `nyc1.digitaloceanspaces.com`

```
S3_BUCKET_KEY=<your s3 or spaces access key>
```

```
S3_BUCKET_SECRET=<your s3 or spaces secret key>
```

```
S3_BUCKET_NAME=<your s3 bucket or spaces name>
```

3- Simply add file in `files/` folder
4- Replace path in `app.js` file.
5- Run `npm start`