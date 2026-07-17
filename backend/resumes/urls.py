from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ResumeViewSet,
    PersonalInformationViewSet,
    EducationViewSet,
    ExperienceViewSet,
    SkillViewSet,
    ProjectViewSet,
    CertificationViewSet,
    LanguageViewSet,
    InterestViewSet,

    DashboardStatsAPIView,
    RecentResumeAPIView,
    MonthlyAnalyticsAPIView,
    CategoryAnalyticsAPIView,
    NotificationAPIView,
    ResumePDFAPIView,
    ResumeATSAPIView,
)

router = DefaultRouter()

# Resume
router.register(
    r"resumes",
    ResumeViewSet,
    basename="resume"
)

# Personal Information
router.register(
    r"personal-info",
    PersonalInformationViewSet,
    basename="personal-info"
)

# Education
router.register(
    r"education",
    EducationViewSet,
    basename="education"
)

# Experience
router.register(
    r"experience",
    ExperienceViewSet,
    basename="experience"
)

# Skills
router.register(
    r"skills",
    SkillViewSet,
    basename="skill"
)

# Projects
router.register(
    r"projects",
    ProjectViewSet,
    basename="project"
)

# Certifications
router.register(
    r"certifications",
    CertificationViewSet,
    basename="certification"
)

# Languages
router.register(
    r"languages",
    LanguageViewSet,
    basename="language"
)

# Interests
router.register(
    r"interests",
    InterestViewSet,
    basename="interest"
)

urlpatterns = router.urls + [

    # ==========================
    # Dashboard APIs
    # ==========================

    path(
        "dashboard/",
        DashboardStatsAPIView.as_view(),
        name="dashboard-stats",
    ),

    path(
        "dashboard/recent/",
        RecentResumeAPIView.as_view(),
        name="dashboard-recent",
    ),

    path(
        "dashboard/monthly/",
        MonthlyAnalyticsAPIView.as_view(),
        name="dashboard-monthly",
    ),

    path(
        "dashboard/categories/",
        CategoryAnalyticsAPIView.as_view(),
        name="dashboard-categories",
    ),

    path(
        "dashboard/notifications/",
        NotificationAPIView.as_view(),
        name="dashboard-notifications",
    ),

     path(
        "resumes/<int:pk>/download/",
        ResumePDFAPIView.as_view(),
        name="resume-download",
    ),
    path(
    "resumes/<int:pk>/ats/",
    ResumeATSAPIView.as_view(),
    name="resume-ats",
),
]