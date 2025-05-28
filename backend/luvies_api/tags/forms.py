from django import forms
from .models import Tag

INPUT_CLASSES = 'w-full py-4 px-6 rounded-xl border'

class NewTagForm(forms.ModelForm):
    class Meta:
        model = Tag
        fields = ('tag_text', 'created_by')
