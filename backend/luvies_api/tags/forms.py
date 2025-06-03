from django import forms
from .models import Tag


INPUT_CLASSES = 'w-full py-4 px-6 rounded-xl border'

class NewTagForm(forms.ModelForm):
    class Meta:
        model = Tag
        fields = ('tag_text',)
    
    tag_text = forms.CharField(widget=forms.TextInput(attrs={
    'placeholder': 'Enter a tag...',
    'class': 'w-full py-4 px-6 rounded-xl border'
    }))
    

