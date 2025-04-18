from django.db import models

# Create your models here.
class Server(models.Model):
    name = models.CharField(max_length=255)
    ip_add = models.GenericIPAddressField()
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('down', 'Down')])
    last_checked = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Alert(models.Model):
    type = [
        ('critical', 'Critical'),
        ('medium', 'Medium'),
        ('low', 'Low')
    ]
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    alert_type = models.CharField(max_length=20, choices=type)
    timestamp = models.DateTimeField(auto_now_add=True)
    note = models.TextField()

    def __str__(self):
        return f"{self.alert_type} Alert generated from {self.server.name}  at {self.timestamp}"
    
class Metric(models.Model):
    server = models.ForeignKey(Server, on_delete=models.CASCADE)
    cpu_usage = models.FloatField()
    ram_usage = models.FloatField()
    disk_usage = models.FloatField()
    app_usage = models.FloatField()

    def __str__(self):
        return f"Metrics for {self.server.name}"