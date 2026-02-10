"""
ASGI config for farmer_project project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'farmer_project.settings')

application = get_asgi_application()
