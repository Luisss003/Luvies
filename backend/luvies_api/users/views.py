from django.shortcuts import render, redirect
from .forms import SignupForm
from django.contrib.auth import logout

# Create your views here.
def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('/')
    else:
        form = SignupForm()

    return render(request, 'users/signup.html', {
        'form': form
    })

def logout_view(request):
    logout(request)
    return redirect('/')
