from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .forms import NewTagForm
from django.utils import timezone
from movie.models import Movie

# Create your views here.
@login_required
def tag_creation(request, pk):
    movie = get_object_or_404(Movie, pk=pk)

    if request.method == 'POST':
        form = NewTagForm(request.POST)

        if form.is_valid():
            tag = form.save(commit=False)
            tag.created_by = request.user
            tag.movie = movie
            tag.created_at = timezone.now()            
            tag.save()
            #TODO: Redirect to user dashboard
            return redirect('/')

    else:
        form = NewTagForm()

    return render(request, 'tags/tag_creation.html', {
        'form': form
    })
