from rest_framework.permissions import BasePermission


class IsResumeOwner(BasePermission):
    """
    Permission for Resume model.
    Only the owner of the resume can access it.
    """

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsResumeSectionOwner(BasePermission):
    """
    Permission for all Resume child models
    (Education, Experience, Skills, Projects, etc.)
    """

    def has_object_permission(self, request, view, obj):
        return obj.resume.user == request.user