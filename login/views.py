# maintenance_reports/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import MaintenanceReport

@csrf_exempt
def maintenance_report(request):
    if request.method == 'POST':
        vehicle_name = request.POST.get('vehicleName')
        vehicle_type = request.POST.get('vehicleType')
        used_material = request.POST.get('usedMaterial')
        total_cost = request.POST.get('totalCost')

        maintenance_report = MaintenanceReport(
            vehicle_name=vehicle_name,
            vehicle_type=vehicle_type,
            used_material=used_material,
            total_cost=total_cost
        )
        maintenance_report.save()

        return JsonResponse({'message': 'Maintenance report received'})
