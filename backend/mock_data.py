from monitor.models import Server, Metric, Alert
from faker import Faker
import random

fake = Faker()

# Create servers
for _ in range(5):
    server_name = fake.company()
    server_ip = fake.ipv4()
    server_status = random.choice(['active', 'down'])
    last_checked = fake.date_this_year()

    server = Server.objects.create(
        name=server_name,
        ip_add=server_ip,
        status=server_status,
        last_checker=last_checked
    )

    # Create metrics for each server
    for _ in range(3):
        Metric.objects.create(
            server=server,
            cpu_usage=random.uniform(10.0, 100.0),
            ram_usage=random.uniform(10.0, 100.0),
            disk_usage=random.uniform(10.0, 100.0),
            app_usage=random.uniform(10.0, 100.0)
        )

    # Create alerts for each server
    for _ in range(2):
        Alert.objects.create(
            server=server,
            alert_type=random.choice(['critical', 'medium', 'low']),
            note=fake.sentence()
        )
