from django.contrib import admin
from .models import (
    Resume,
    PersonalInformation,
    Education,
    Experience,
    Skill,
    Project,
    Certification,
    Language,
    Interest,
)


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "user",
        "template",
        "ats_score",
        "downloads",
        "applications",
        "updated_at",
    )
    list_filter = ("template", "created_at")
    search_fields = ("title", "user__email", "user__username")
    ordering = ("-updated_at",)


@admin.register(PersonalInformation)
class PersonalInformationAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "email",
        "phone",
    )
    search_fields = (
        "first_name",
        "last_name",
        "email",
    )


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = (
        "institution",
        "degree",
        "field_of_study",
        "start_date",
        "end_date",
    )
    search_fields = (
        "institution",
        "degree",
    )


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = (
        "company",
        "position",
        "employment_type",
        "start_date",
        "end_date",
    )
    search_fields = (
        "company",
        "position",
    )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "level",
    )
    search_fields = ("name",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "technologies",
    )
    search_fields = (
        "title",
        "technologies",
    )


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "organization",
        "issue_date",
    )
    search_fields = (
        "name",
        "organization",
    )


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "proficiency",
    )


@admin.register(Interest)
class InterestAdmin(admin.ModelAdmin):
    list_display = ("name",)