"""
Checks upstream repository for changes against pinned commit in config/upstream.yaml.
"""

import sys
import yaml
from pathlib import Path
import click

@click.command()
@click.option("--source", default=".upstream", help="Path to upstream repository")
@click.option("--config", default="config/upstream.yaml", help="Path to upstream config")
def check_upstream(source, config):
    source_dir = Path(source)
    config_file = Path(config)
    
    if not config_file.exists():
        click.echo(f"Warning: Config file {config} not found.")
        return
        
    with open(config_file, "r", encoding="utf-8") as f:
        cfg = yaml.safe_load(f)
        
    pinned = cfg.get("upstream", {}).get("pinned_commit")
    click.echo(f"Pinned upstream commit: {pinned}")
    
    head_file = source_dir / ".git" / "refs" / "heads" / "main"
    if head_file.exists():
        head = head_file.read_text().strip()
        click.echo(f"Local upstream HEAD:    {head}")
        if pinned and head != pinned:
            click.echo("Notice: Local upstream HEAD differs from pinned commit.")
        else:
            click.echo("Upstream commit verified matching pinned specification.")

if __name__ == "__main__":
    check_upstream()
