# django_notes
https://www.youtube.com/watch?v=tYKRAXIio28
youtube - Django + React Notes App

setup backend:
mkdir django_react_notes
cd django_react_notes
# pyenv local 3.10.10 - creates python-version file
# pyenv virtualenv 3.10.10 django_react_notes - just first time to create venv
# pyenv activate django_react_notes
export PYTHON_KEYRING_BACKEND=keyring.backends.null.Keyring

Add the following to ~/.bashrc:
function set_poetry_env {
  if [ -n "$VIRTUAL_ENV" ]; then
  PS1="($VIRTUAL_ENV) $PS1"
  fi
}

set_poetry_env

poetry shell - activates env
poetry init - makes pyproject.toml
poetry add django - adds it as a dependency
poetry install - installs the dependencies
poetry run django-admin startproject mysite - creates the django project

django_react_notes/git init

to start backend:
/django_react_notes$ python manage.py runserver
/django_react_notes$ python manage.py startapp api - create an app

python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser - for /admin account richdjaQ223@
python manage.py changepassword <user_name>- if they forget

setup frontend:
/django_react_notes$ npm create vite@latest
choose react, typescript
npm install react-router-dom

proxy must be set in vite.config.ts not package.json (react)
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})


npm i react-scripts@latest - process not found
npm i vite-plugin-svgr - to import and use .svg files
https://www.freecodecamp.org/news/how-to-import-svgs-in-react-and-vite/
https://bobbyhadz.com/blog/expose-local-vite-app-to-network

useNavigate() instead of useHistory() - react5 -> 6


npm install

to start frontend:
cd frontend
npm run dev
Local:   http://localhost:5173/

info:
# /home/rich/.pyenv/versions/3.10.10/envs/dfb_full_tutorial/lib/python3.10/site-packages/
./node_modules/.bin/vite - to run vite

ReactComponent as svg
"compilerOptions":
{
  [...rest...]
  "types": ["vite-plugin-svgr/client"] <--- this line
},


Error: That port is already in use.
(django_notes) rich@mx:~/projects/python/django/django_notes/mysite$ lsof -i:8000
kill -9 pid
