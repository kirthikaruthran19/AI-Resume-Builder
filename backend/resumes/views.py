

from django.http import HttpResponse
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)

from .ats import calculate_ats_score
from reportlab.lib.styles import getSampleStyleSheet
from rest_framework import permissions, viewsets

from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .services import (
    get_dashboard_stats,
    get_recent_resumes,
    get_monthly_analytics,
    get_category_analytics,
    get_notifications,
)

from .serializers import (
    DashboardStatsSerializer,
    RecentResumeSerializer,
    MonthlyAnalyticsSerializer,
    CategoryAnalyticsSerializer,
    NotificationSerializer,
)
from .permissions import (
    IsResumeOwner,
    IsResumeSectionOwner,
)
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

from .serializers import (
    ResumeSerializer,
    PersonalInformationSerializer,
    EducationSerializer,
    ExperienceSerializer,
    SkillSerializer,
    ProjectSerializer,
    CertificationSerializer,
    LanguageSerializer,
    InterestSerializer,
)


# ==========================================================
# Resume ViewSet
# ==========================================================
class ResumeViewSet(viewsets.ModelViewSet):

    serializer_class = ResumeSerializer

    permission_classes = [
        permissions.IsAuthenticated,
        IsResumeOwner,
    ]

    http_method_names = [
        "get",
        "post",
        "put",
        "patch",
        "delete",
        "head",
        "options",
    ]

    def get_queryset(self):
        return Resume.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )
    

# ==========================================================
# Base Child ViewSet
# ==========================================================

class ResumeChildViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):
        return self.queryset.filter(
            resume__user=self.request.user
        )

    def get_object(self):

        obj = super().get_object()

        if obj.resume.user != self.request.user:
            raise PermissionDenied(
                "You do not have permission to access this resource."
            )

        return obj

    def perform_create(self, serializer):

        resume = serializer.validated_data["resume"]

        if resume.user != self.request.user:
            raise PermissionDenied(
                "You do not have permission to use this resume."
            )

        serializer.save()

    def perform_update(self, serializer):

        resume = serializer.validated_data.get(
            "resume",
            serializer.instance.resume,
        )

        if resume.user != self.request.user:
            raise PermissionDenied(
                "You do not have permission to modify this resume."
            )

        serializer.save()


# ==========================================================
# Personal Information
# ==========================================================

class PersonalInformationViewSet(ResumeChildViewSet):
    queryset = PersonalInformation.objects.select_related("resume")
    serializer_class = PersonalInformationSerializer


# ==========================================================
# Education
# ==========================================================

class EducationViewSet(ResumeChildViewSet):
    queryset = Education.objects.select_related("resume")
    serializer_class = EducationSerializer


# ==========================================================
# Experience
# ==========================================================

class ExperienceViewSet(ResumeChildViewSet):
    queryset = Experience.objects.select_related("resume")
    serializer_class = ExperienceSerializer


# ==========================================================
# Skills
# ==========================================================

class SkillViewSet(ResumeChildViewSet):
    queryset = Skill.objects.select_related("resume")
    serializer_class = SkillSerializer


# ==========================================================
# Projects
# ==========================================================

class ProjectViewSet(ResumeChildViewSet):
    queryset = Project.objects.select_related("resume")
    serializer_class = ProjectSerializer


# ==========================================================
# Certifications
# ==========================================================

class CertificationViewSet(ResumeChildViewSet):
    queryset = Certification.objects.select_related("resume")
    serializer_class = CertificationSerializer


# ==========================================================
# Languages
# ==========================================================

class LanguageViewSet(ResumeChildViewSet):
    queryset = Language.objects.select_related("resume")
    serializer_class = LanguageSerializer


# ==========================================================
# Interests
# ==========================================================

class InterestViewSet(ResumeChildViewSet):
    queryset = Interest.objects.select_related("resume")
    serializer_class = InterestSerializer

# ==========================================================
# Dashboard APIs
# ==========================================================

class DashboardStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = get_dashboard_stats(request.user)
        serializer = DashboardStatsSerializer(data)
        return Response(serializer.data)


class RecentResumeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        resumes = get_recent_resumes(request.user)
        serializer = RecentResumeSerializer(resumes, many=True)
        return Response(serializer.data)


class MonthlyAnalyticsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = get_monthly_analytics(request.user)
        serializer = MonthlyAnalyticsSerializer(data, many=True)
        return Response(serializer.data)


class CategoryAnalyticsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = get_category_analytics(request.user)
        serializer = CategoryAnalyticsSerializer(data, many=True)
        return Response(serializer.data)


class NotificationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = get_notifications(request.user)
        serializer = NotificationSerializer(data, many=True)
        return Response(serializer.data)    
    
# ==========================================================
# Resume PDF Download API
# ==========================================================

# ==========================================================
# Resume PDF Download API
# ==========================================================

class ResumePDFAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        try:

            resume = Resume.objects.get(
                id=pk,
                user=request.user
            )

        except Resume.DoesNotExist:

            return Response(
                {"error": "Resume not found."},
                status=404
            )

        response = HttpResponse(
            content_type="application/pdf"
        )

        response["Content-Disposition"] = (
            f'attachment; filename="{resume.title}.pdf"'
        )

        doc = SimpleDocTemplate(response)

        styles = getSampleStyleSheet()

        story = []

        # ======================================
        # Resume Title
        # ======================================

        story.append(
            Paragraph(
                resume.title,
                styles["Title"]
            )
        )

        story.append(Spacer(1, 12))

        # ======================================
        # Personal Information
        # ======================================

        personal = getattr(
            resume,
            "personal_info",
            None
        )

        if personal:

            story.append(
                Paragraph(
                    "<b>Personal Information</b>",
                    styles["Heading2"]
                )
            )

            story.append(
                Paragraph(
                    f"<b>Name:</b> {personal.first_name} {personal.last_name}",
                    styles["Normal"]
                )
            )

            if personal.job_title:
                story.append(
                    Paragraph(
                        f"<b>Job Title:</b> {personal.job_title}",
                        styles["Normal"]
                    )
                )

            if personal.email:
                story.append(
                    Paragraph(
                        f"<b>Email:</b> {personal.email}",
                        styles["Normal"]
                    )
                )

            if personal.phone:
                story.append(
                    Paragraph(
                        f"<b>Phone:</b> {personal.phone}",
                        styles["Normal"]
                    )
                )

            if personal.address:
                story.append(
                    Paragraph(
                        f"<b>Address:</b> {personal.address}",
                        styles["Normal"]
                    )
                )

            if personal.city:
                story.append(
                    Paragraph(
                        f"<b>City:</b> {personal.city}",
                        styles["Normal"]
                    )
                )

            if personal.state:
                story.append(
                    Paragraph(
                        f"<b>State:</b> {personal.state}",
                        styles["Normal"]
                    )
                )

            if personal.country:
                story.append(
                    Paragraph(
                        f"<b>Country:</b> {personal.country}",
                        styles["Normal"]
                    )
                )

            if personal.postal_code:
                story.append(
                    Paragraph(
                        f"<b>Postal Code:</b> {personal.postal_code}",
                        styles["Normal"]
                    )
                )

            if personal.linkedin:
                story.append(
                    Paragraph(
                        f"<b>LinkedIn:</b> {personal.linkedin}",
                        styles["Normal"]
                    )
                )

            if personal.github:
                story.append(
                    Paragraph(
                        f"<b>GitHub:</b> {personal.github}",
                        styles["Normal"]
                    )
                )

            if personal.portfolio:
                story.append(
                    Paragraph(
                        f"<b>Portfolio:</b> {personal.portfolio}",
                        styles["Normal"]
                    )
                )

            story.append(Spacer(1, 12))

            # ======================================
            # Professional Summary
            # ======================================

            if personal.summary:

                story.append(
                    Paragraph(
                        "<b>Professional Summary</b>",
                        styles["Heading2"]
                    )
                )

                story.append(
                    Paragraph(
                        personal.summary,
                        styles["Normal"]
                    )
                )

                story.append(Spacer(1, 12))
                        # ======================================
        # Education
        # ======================================

        educations = resume.education.all()

        if educations.exists():

            story.append(
                Paragraph(
                    "<b>Education</b>",
                    styles["Heading2"]
                )
            )

            for education in educations:

                story.append(
                    Paragraph(
                        f"<b>{education.degree}</b>",
                        styles["Heading3"]
                    )
                )

                story.append(
                    Paragraph(
                        f"{education.institution}",
                        styles["Normal"]
                    )
                )

                if education.field_of_study:
                    story.append(
                        Paragraph(
                            education.field_of_study,
                            styles["Normal"]
                        )
                    )

                story.append(
                    Paragraph(
                        f"{education.start_date} - {education.end_date}",
                        styles["Normal"]
                    )
                )

                if education.grade:
                    story.append(
                        Paragraph(
                            f"Grade: {education.grade}",
                            styles["Normal"]
                        )
                    )

                if education.description:
                    story.append(
                        Paragraph(
                            education.description,
                            styles["Normal"]
                        )
                    )

                story.append(Spacer(1, 8))

        # ======================================
        # Experience
        # ======================================

        experiences = resume.experience.all()

        if experiences.exists():

            story.append(
                Paragraph(
                    "<b>Experience</b>",
                    styles["Heading2"]
                )
            )

            for experience in experiences:

                story.append(
                    Paragraph(
                        f"<b>{experience.position}</b>",
                        styles["Heading3"]
                    )
                )

                story.append(
                    Paragraph(
                        experience.company,
                        styles["Normal"]
                    )
                )

                story.append(
                    Paragraph(
                        f"{experience.start_date} - {experience.end_date}",
                        styles["Normal"]
                    )
                )

                if experience.description:
                    story.append(
                        Paragraph(
                            experience.description,
                            styles["Normal"]
                        )
                    )

                story.append(Spacer(1, 8))

        # ======================================
        # Skills
        # ======================================

        skills = resume.skills.all()

        if skills.exists():

            story.append(
                Paragraph(
                    "<b>Skills</b>",
                    styles["Heading2"]
                )
            )

            skill_text = ", ".join(

                skill.name

                for skill in skills

            )

            story.append(
                Paragraph(
                    skill_text,
                    styles["Normal"]
                )
            )

            story.append(Spacer(1, 12))
                    # ======================================
        # Projects
        # ======================================

        projects = resume.projects.all()

        if projects.exists():

            story.append(
                Paragraph(
                    "<b>Projects</b>",
                    styles["Heading2"]
                )
            )

            for project in projects:

                story.append(
                    Paragraph(
                        f"<b>{project.title}</b>",
                        styles["Heading3"]
                    )
                )

                if project.description:
                    story.append(
                        Paragraph(
                            project.description,
                            styles["Normal"]
                        )
                    )

                if getattr(project, "technologies", None):
                    story.append(
                        Paragraph(
                            f"<b>Technologies:</b> {project.technologies}",
                            styles["Normal"]
                        )
                    )

                if getattr(project, "github_link", None):
                    story.append(
                        Paragraph(
                            f"<b>GitHub:</b> {project.github_url}",
                            styles["Normal"]
                        )
                    )

                if getattr(project, "live_link", None):
                    story.append(
                        Paragraph(
                            f"<b>Live:</b> {project.project_url}",
                            styles["Normal"]
                        )
                    )

                story.append(Spacer(1, 8))

        # ======================================
        # Certifications
        # ======================================

        certifications = resume.certifications.all()

        if certifications.exists():

            story.append(
                Paragraph(
                    "<b>Certifications</b>",
                    styles["Heading2"]
                )
            )

            for certification in certifications:

                story.append(
                    Paragraph(
                        certification.name,
                        styles["Heading3"]
                    )
                )

                if getattr(certification, "organization", None):
                    story.append(
                        Paragraph(
                            certification.organization,
                            styles["Normal"]
                        )
                    )

                if getattr(certification, "issue_date", None):
                    story.append(
                        Paragraph(
                            str(certification.issue_date),
                            styles["Normal"]
                        )
                    )

                story.append(Spacer(1, 8))

        # ======================================
        # Languages
        # ======================================

        languages = resume.languages.all()

        if languages.exists():

            story.append(
                Paragraph(
                    "<b>Languages</b>",
                    styles["Heading2"]
                )
            )

            language_text = ", ".join(

                language.name

                for language in languages

            )

            story.append(
                Paragraph(
                    language_text,
                    styles["Normal"]
                )
            )

            story.append(Spacer(1, 12))

        # ======================================
        # Interests
        # ======================================

        interests = resume.interests.all()

        if interests.exists():

            story.append(
                Paragraph(
                    "<b>Interests</b>",
                    styles["Heading2"]
                )
            )

            interest_text = ", ".join(

                interest.name

                for interest in interests

            )

            story.append(
                Paragraph(
                    interest_text,
                    styles["Normal"]
                )
            )

            story.append(Spacer(1, 12))

        # ======================================
        # Build PDF
        # ======================================

        doc.build(story)

        return response 
    
# ==========================================================
# ATS Score API
# ==========================================================

class ResumeATSAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        try:

            resume = Resume.objects.get(
                id=pk,
                user=request.user,
            )

        except Resume.DoesNotExist:

            return Response(
                {
                    "error": "Resume not found."
                },
                status=404,
            )

        score, suggestions = calculate_ats_score(resume)

        resume.ats_score = score
        resume.save(update_fields=["ats_score"])

        return Response({

            "score": score,

            "suggestions": suggestions,

        })    