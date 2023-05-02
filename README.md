# django_notes
https://www.youtube.com/watch?v=tYKRAXIio28
youtube - Django + React Notes App

setup:
mkdir django_react_notes
cd django_react_notes
pyenv local 3.10.10 - creates python-version file
pyenv virtualenv 3.10.10 django_react_notes - just first time to create venv
pyenv activate django_react_notes
export PYTHON_KEYRING_BACKEND=keyring.backends.null.Keyring
poetry init - makes pyproject.toml
poetry add django - adds it as a dependency
poetry install - installs the dependencies
poetry run django-admin startproject mysite - creates the django project
django_react_notes/git init

to start:
/django_react_notes$ python manage.py runserver
/django_react_notes$ python manage.py startapp api - create an app

python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser - for /admin account richdjaQ223@
python manage.py changepassword <user_name>- if they forget

info:
/home/rich/.pyenv/versions/3.10.10/envs/dfb_full_tutorial/lib/python3.10/site-packages/

Error: That port is already in use.
(django_notes) rich@mx:~/projects/python/django/django_notes/mysite$ lsof -i:8000
kill -9 pid
