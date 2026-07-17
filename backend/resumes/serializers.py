from rest_framework import serializers

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


# ======================================================
# Personal Information
# ======================================================

class PersonalInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInformation
        fields = "__all__"


# ======================================================
# Education
# ======================================================

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = "__all__"


# ======================================================
# Experience
# ======================================================

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = "__all__"


# ======================================================
# Skills
# ======================================================

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


# ======================================================
# Projects
# ======================================================

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


# ======================================================
# Certifications
# ======================================================

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = "__all__"


# ======================================================
# Languages
# ======================================================

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = "__all__"


# ======================================================
# Interests
# ======================================================

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = "__all__"


# ======================================================
# Resume Serializer
# ======================================================

class ResumeSerializer(serializers.ModelSerializer):

    personal_info = PersonalInformationSerializer(read_only=True)

    education = EducationSerializer(
        many=True,
        read_only=True
    )

    experience = ExperienceSerializer(
        many=True,
        read_only=True
    )

    skills = SkillSerializer(
        many=True,
        read_only=True
    )

    projects = ProjectSerializer(
        many=True,
        read_only=True
    )

    certifications = CertificationSerializer(
        many=True,
        read_only=True
    )

    languages = LanguageSerializer(
        many=True,
        read_only=True
    )

    interests = InterestSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Resume
        fields = [
            "id",
            "user",
            "title",
            "template",
            "ats_score",
            "downloads",
            "applications",
            "created_at",
            "updated_at",

            "personal_info",
            "education",
            "experience",
            "skills",
            "projects",
            "certifications",
            "languages",
            "interests",
        ]

        read_only_fields = [
    "id",
    "user",
    "ats_score",
    "downloads",
    "applications",
    "created_at",
    "updated_at",
]

        from rest_framework import serializers
from .models import Resume


class DashboardStatsSerializer(serializers.Serializer):
    total_resumes = serializers.IntegerField()
    average_ats_score = serializers.IntegerField()
    downloads = serializers.IntegerField()
    applications = serializers.IntegerField()
    templates_used = serializers.IntegerField()


class RecentResumeSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = Resume
        fields = [
            "id",
            "title",
            "template",
            "ats_score",
            "downloads",
            "applications",
            "updated_at",
            "status",
        ]

    def get_status(self, obj):
        return "Completed" if obj.ats_score >= 80 else "Draft"


class MonthlyAnalyticsSerializer(serializers.Serializer):
    month = serializers.CharField()
    count = serializers.IntegerField()


class CategoryAnalyticsSerializer(serializers.Serializer):
    name = serializers.CharField()
    value = serializers.IntegerField()


class NotificationSerializer(serializers.Serializer):
    title = serializers.CharField()
    message = serializers.CharField()
    time = serializers.CharField()