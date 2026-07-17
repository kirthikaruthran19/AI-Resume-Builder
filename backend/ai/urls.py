from django.urls import path

from .views import (
    OptimizeSummaryAPIView,
    ATSScoreAPIView,
    GenerateResumeAPIView,
)

urlpatterns = [
    path(
        "optimize-summary/",
        OptimizeSummaryAPIView.as_view(),
        name="optimize-summary",
    ),

    path(
        "ats-score/",
        ATSScoreAPIView.as_view(),
        name="ats-score",
    ),

    path(
        "generate-resume/",
        GenerateResumeAPIView.as_view(),
        name="generate-resume",
    ),
]