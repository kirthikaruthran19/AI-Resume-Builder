from django.db import models
from django.conf import settings


class Resume(models.Model):
    TEMPLATE_CHOICES = [
        ("professional", "Professional"),
        ("modern", "Modern"),
        ("creative", "Creative"),
        ("minimal", "Minimal"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="resumes"
    )

    title = models.CharField(max_length=200, default="Untitled Resume")

    template = models.CharField(
        max_length=50,
        choices=TEMPLATE_CHOICES,
        default="professional"
    )

    ats_score = models.PositiveIntegerField(default=0)

    downloads = models.PositiveIntegerField(default=0)

    applications = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return self.title


class PersonalInformation(models.Model):
    resume = models.OneToOneField(
        Resume,
        on_delete=models.CASCADE,
        related_name="personal_info"
    )

    first_name = models.CharField(max_length=100)

    last_name = models.CharField(max_length=100)

    job_title = models.CharField(max_length=200, blank=True)

    email = models.EmailField()

    phone = models.CharField(max_length=20)

    address = models.CharField(max_length=255, blank=True)

    city = models.CharField(max_length=100, blank=True)

    state = models.CharField(max_length=100, blank=True)

    country = models.CharField(max_length=100, blank=True)

    postal_code = models.CharField(max_length=20, blank=True)

    linkedin = models.URLField(blank=True)

    github = models.URLField(blank=True)

    portfolio = models.URLField(blank=True)

    summary = models.TextField(blank=True)

    profile_image = models.ImageField(
        upload_to="profile_images/",
        blank=True,
        null=True
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Education(models.Model):
    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="education"
    )

    institution = models.CharField(max_length=200)

    degree = models.CharField(max_length=200)

    field_of_study = models.CharField(max_length=200, blank=True)

    start_date = models.DateField()

    end_date = models.DateField(null=True, blank=True)

    currently_studying = models.BooleanField(default=False)

    grade = models.CharField(max_length=50, blank=True)

    description = models.TextField(blank=True)

    class Meta:
        ordering = ["-start_date"]

    def __str__(self):
        return self.degree


class Experience(models.Model):
    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="experience"
    )

    company = models.CharField(max_length=200)

    position = models.CharField(max_length=200)

    location = models.CharField(max_length=200, blank=True)

    employment_type = models.CharField(
        max_length=100,
        blank=True
    )

    start_date = models.DateField()

    end_date = models.DateField(
        blank=True,
        null=True
    )

    currently_working = models.BooleanField(default=False)

    description = models.TextField()

    class Meta:
        ordering = ["-start_date"]

    def __str__(self):
        return self.position


class Skill(models.Model):
    LEVEL_CHOICES = [
        ("Beginner", "Beginner"),
        ("Intermediate", "Intermediate"),
        ("Advanced", "Advanced"),
        ("Expert", "Expert"),
    ]

    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="skills"
    )

    name = models.CharField(max_length=100)

    level = models.CharField(
        max_length=20,
        choices=LEVEL_CHOICES,
        default="Intermediate"
    )

    def __str__(self):
        return self.name


class Project(models.Model):
    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="projects"
    )

    title = models.CharField(max_length=200)

    technologies = models.CharField(max_length=255)

    project_url = models.URLField(blank=True)

    github_url = models.URLField(blank=True)

    description = models.TextField()

    def __str__(self):
        return self.title


class Certification(models.Model):
    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="certifications"
    )

    name = models.CharField(max_length=200)

    organization = models.CharField(max_length=200)

    issue_date = models.DateField()

    expiration_date = models.DateField(
        blank=True,
        null=True
    )

    credential_id = models.CharField(
        max_length=100,
        blank=True
    )

    credential_url = models.URLField(blank=True)

    def __str__(self):
        return self.name


class Language(models.Model):
    PROFICIENCY_CHOICES = [
        ("Basic", "Basic"),
        ("Conversational", "Conversational"),
        ("Professional", "Professional"),
        ("Native", "Native"),
    ]

    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="languages"
    )

    name = models.CharField(max_length=100)

    proficiency = models.CharField(
        max_length=30,
        choices=PROFICIENCY_CHOICES,
        default="Professional"
    )

    def __str__(self):
        return self.name


class Interest(models.Model):
    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="interests"
    )

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name