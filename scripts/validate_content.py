"""
Validation runner for skills.json schema conformance and reference integrity.
"""

import sys
import json
from pathlib import Path
import click
from schema import SkillsCatalogue

@click.command()
@click.option("--input", "input_file", default="public/data/skills.json", help="Path to skills.json")
def validate(input_file):
    click.echo(f"==> Validating catalogue {input_file} against Pydantic schema...")
    path = Path(input_file)
    if not path.exists():
        click.echo(f"Error: Catalogue file {input_file} does not exist. Run build_skills.py first.")
        sys.exit(1)
        
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        catalogue = SkillsCatalogue.model_validate(data)
        click.echo(f"Validation successful! {len(catalogue.skills)} skills conform to schema v{catalogue.version}.")
    except Exception as e:
        click.echo(f"Validation error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    validate()
