from collections import Counter
from django.db.models import Avg, Sum
from django.db.models.functions import TruncMonth
from .models import Resume


def get_dashboard_stats(user):
    """
    Returns dashboard statistics for the logged-in user.
    """

    resumes = Resume.objects.filter(user=user)

    total_resumes = resumes.count()

    average_ats_score = (
        resumes.aggregate(avg=Avg("ats_score"))["avg"] or 0
    )

    total_downloads = (
        resumes.aggregate(total=Sum("downloads"))["total"] or 0
    )

    total_applications = (
        resumes.aggregate(total=Sum("applications"))["total"] or 0
    )

    templates_used = (
        resumes.values("template").distinct().count()
    )

    return {
        "total_resumes": total_resumes,
        "average_ats_score": round(average_ats_score),
        "downloads": total_downloads,
        "applications": total_applications,
        "templates_used": templates_used,
    }


def get_recent_resumes(user):
    """
    Returns the latest 5 resumes.
    """

    return Resume.objects.filter(
        user=user
    ).order_by("-updated_at")[:5]


def get_monthly_analytics(user):
    """
    Returns resume creation count grouped by month.
    """

    queryset = (
        Resume.objects.filter(user=user)
        .annotate(month=TruncMonth("created_at"))
        .values("month")
        .order_by("month")
    )

    monthly = {}

    for item in queryset:
        key = item["month"].strftime("%b")

        monthly[key] = monthly.get(key, 0) + 1

    return [
        {
            "month": month,
            "count": count
        }
        for month, count in monthly.items()
    ]


def get_category_analytics(user):
    """
    Returns template usage distribution.
    """

    resumes = Resume.objects.filter(user=user)

    counter = Counter(
        resumes.values_list(
            "template",
            flat=True
        )
    )

    return [
        {
            "name": template.title(),
            "value": count
        }
        for template, count in counter.items()
    ]


def get_notifications(user):
    """
    Temporary dashboard notifications.
    Will be replaced with a Notification model later.
    """

    resumes = Resume.objects.filter(
        user=user
    ).order_by("-updated_at")[:5]

    notifications = []

    for resume in resumes:
        notifications.append(
            {
                "title": f'"{resume.title}" updated',
                "message": "Resume updated successfully.",
                "time": resume.updated_at.strftime("%d %b %Y"),
            }
        )

    return notifications