# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9cbb4b4f-2af8-43be-addd-4775ae42b0d0

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9cbb4b4f-2af8-43be-addd-4775ae42b0d0) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9cbb4b4f-2af8-43be-addd-4775ae42b0d0) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Checking translations

Maintain completeness of translations by running:

```sh
npm run lint:translations
```

This script verifies that every language file under `src/locales` contains the
same keys as the English translation. The CI workflow also runs this command on
pull requests.

## Supabase migrations and user profile constraint

When setting up the database you must run the Supabase migrations found under
`supabase/migrations`. One of these migrations adds a unique constraint on the
`user_id` column of the `user_profiles` table and relies on there being no
duplicate rows. If duplicates exist the migration will fail, so clean them up
first:

```sql
DELETE FROM user_profiles a
USING user_profiles b
WHERE a.ctid < b.ctid AND a.user_id = b.user_id;
```

After removing duplicates, apply the migration using the Supabase CLI:

```sh
npx supabase db push
```

You can verify that the constraint is present with:

```sql
SELECT conname FROM pg_constraint WHERE conname='user_profiles_user_id_unique';
```

Once the migration is in place, edit a profile and confirm that the
`job_type`, `job_properties` and `department_id` fields update correctly.

## Cleaning up job properties

If older rows contain malformed values in the `job_properties` column you can
normalize them with:

```sh
npm run clean-job-properties
```

The script converts comma-separated strings or stringified arrays into proper
PostgreSQL arrays and removes duplicates.
