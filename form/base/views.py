from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.core.exceptions import ValidationError
from .models import User

def home(request):
    if request.method == 'POST':
        try:
            # Validate required fields
            name = request.POST.get('name')
            email = request.POST.get('email')
            phone = request.POST.get('phone')
            address = request.POST.get('address')

            if not all([name, email, phone, address]):
                messages.error(request, 'All fields are required.')
                return redirect('home')

            # Create new user
            user = User.objects.create(
                name=name,
                email=email,
                phone=phone,
                address=address
            )
            messages.success(request, 'User information submitted successfully!')
            return redirect('home')
        except Exception as e:
            messages.error(request, 'An error occurred while saving the data.')
            return redirect('home')
    
    users = User.objects.all().order_by('-created_at')
    return render(request, 'base/home.html', {'users': users})

def delete_user(request, user_id):
    try:
        user = get_object_or_404(User, id=user_id)
        user.delete()
        messages.success(request, 'User deleted successfully!')
    except Exception as e:
        messages.error(request, 'Error deleting user.')
    return redirect('home')
