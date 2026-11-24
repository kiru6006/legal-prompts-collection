"""
Validation runner for skills.json schema conformance and reference integrity.
"""

import sys
import json
from pathlib import Path
import click
from schema import SkillsCatalogue, LawyerPlaybookCatalogue

@click.command()
@click.option("--input", "input_file", default="public/data/skills.json", help="Path to skills.json")
@click.option("--playbook", "playbook_file", default="public/data/lawyer_prompts.json", help="Path to lawyer_prompts.json")
def validate(input_file, playbook_file):
    click.echo(f"==> Validating skills catalogue {input_file} against Pydantic schema...")
    path = Path(input_file)
    if not path.exists():
        click.echo(f"Error: Catalogue file {input_file} does not exist. Run build_skills.py first.")
        sys.exit(1)
        
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        catalogue = SkillsCatalogue.model_validate(data)
        click.echo(f"Validation successful! {len(catalogue.skills)} skills conform to schema v{catalogue.version}.")
    except Exception as e:
        click.echo(f"Validation error in skills: {e}")
        sys.exit(1)

    playbook_path = Path(playbook_file)
    if playbook_path.exists():
        click.echo(f"==> Validating lawyer prompts playbook {playbook_file} against Pydantic schema...")
        try:
            pb_data = json.loads(playbook_path.read_text(encoding="utf-8"))
            playbook = LawyerPlaybookCatalogue.model_validate(pb_data)
            click.echo(f"Validation successful! {len(playbook.prompts)} lawyer prompts across {len(playbook.categories)} categories conform to schema.")
        except Exception as e:
            click.echo(f"Validation error in lawyer prompts: {e}")
            sys.exit(1)

if __name__ == "__main__":
    validate()
