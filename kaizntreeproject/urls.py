"""
URL configuration for kaizntreeproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from kaizntreeappbackend.views import CreateUserView, LoginView, ItemListCreateView, CategoryListCreateView, TagListCreateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('dj_rest_auth.urls')),
    path('api/create-account/', CreateUserView.as_view(), name='create-account'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/items/', ItemListCreateView.as_view(), name='item-list-create'),
    path('api/categories/', CategoryListCreateView.as_view(), name='category-list'),
    path('api/tags/', TagListCreateView.as_view(), name='tag-list'),

]
