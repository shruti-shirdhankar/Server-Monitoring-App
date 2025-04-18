from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ServerView, AlertView, MetricView

router = DefaultRouter()
router.register(r'servers', ServerView)
router.register(r'alerts', AlertView)
router.register(r'metrics', MetricView)

urlpatterns = [
    path('api/', include(router.urls)),
]