from django.shortcuts import render
from .models import Server, Alert, Metric
from .serializer import ServerSerializer, AlertSerializer, MetricSerializer
from rest_framework import viewsets

# Create your views here.
def servers(request):
    servers = Server.objects.all()
    @api_view(['GET'])
    def get_servers(request):
        servers = Server.objects.all()
        serializer = ServerSerializer(servers, many=True)
        return Response(serializer.data)

class ServerView(viewsets.ModelViewSet):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer

class AlertView(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer

class MetricView(viewsets.ModelViewSet):
    queryset = Metric.objects.all()
    serializer_class = MetricSerializer